const db = require('../db');

const getPackages = (req, res) => {

    const { toCityId, budget, totalDays } = req.body;

    // 1. Basic validation

    if (!toCityId || budget == null || totalDays == null) {
        return res.status(400).json({
            success: false,
            message: 'toCityId, budget and totalDays are required'
        });
    }

    if (Number(budget) <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid budget'
        });
    }

    if (Number(totalDays) <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid duration'
        });
    }

    const sector = toCityId;
    const userBudget = Number(budget);
    const userDays = Number(totalDays);

    // 2. FIRST CHECK - Sector / Destination package exists?

    const sectorSql = `
        SELECT id
        FROM package_details
        WHERE sector = ?
        LIMIT 1
    `;

    db.query(sectorSql, [sector], (sectorError, sectorResults) => {
        if (sectorError) {
            return res.status(500).json({
                success: false,
                message: 'Database error'
            });
        }
        // Sector NOT available
        if (sectorResults.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                status: 'SECTOR_NOT_FOUND',
                message: 'No data found for this destination',
                sentence: {
                    img: '../../../assets/images/package-no-data.png',
                    imgAlt: 'No Data Found',
                    title: 'We couldn’t find the destination you searched for.',
                    msg: 'This destination isn’t available right now. Try another destination to discover amazing travel packages.',
                    buttons: [
                        {
                            label: 'Edit Search',
                            action: 'GO_BACK'
                        }
                    ]
                }
            });
        }

        // 3. SECOND CHECK - Sector exists - Now check selected duration.

        const durationSql = `
                SELECT
                    id,
                    price
                FROM package_details
                WHERE sector = ?
                AND duration_days = ?
            `;

        db.query(durationSql, [sector, userDays], (durationError, durationResults) => {
            if (durationError) {
                return res.status(500).json({
                    success: false,
                    message: 'Package database error'
                });
            }
            // Duration NOT available
            if (durationResults.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: [],
                    status: 'DURATION_NOT_FOUND',
                    message: `No packages are available for ${userDays} days in this destination.`,
                    suggestion: {
                        type: 'duration',
                        requestedDays: userDays
                    },
                    sentence: {
                        img: '../../../assets/images/package_duration',
                        imgAlt: 'Change Duration',
                        title: 'Would you like to change your travel duration?',
                        msg: `We don’t have packages available for ${userDays} days. Would you like to explore another duration?`,
                        buttons: [
                            {
                                label: 'Change Duration',
                                action: 'CHANGE_DURATION'
                            }
                        ]
                    }
                });
            }

            // 4. THIRD CHECK - Sector + Duration exists - Now check budget.

            const packageSql = `
                        SELECT
                            p.id AS packageId,
                            p.sector,
                            p.from_city_id,
                            p.from_city,
                            p.to_city_id,
                            p.to_city,
                            p.package_name,

                            pd.id AS packageDetailId,
                            pd.title,
                            pd.badge,
                            pd.image,
                            pd.days,
                            pd.duration_days,
                            pd.rating,
                            pd.rating_color,
                            pd.reviews,
                            pd.description,
                            pd.used,
                            pd.current_progress,
                            pd.price,
                            pd.remaining,
                            pd.total_budget,
                            pd.popularity,
                            pd.amount_label,
                            pd.sector

                        FROM package_details pd

                        INNER JOIN packages p
                            ON p.id = pd.package_id

                        WHERE pd.sector = ?
                        AND pd.duration_days = ?
                        AND pd.price <= ?

                        ORDER BY pd.popularity DESC

                        LIMIT 3
                    `;

            db.query(packageSql, [sector, userDays, userBudget], (packageError, results) => {
                if (packageError) {
                    return res.status(500).json({
                        success: false,
                        message: 'Package database error'
                    });
                }
                // Packages available
                if (results.length > 0) {
                    const packageDetailIds =
                        results.map(
                            item => item.packageDetailId
                        );
                    const placeholders = packageDetailIds.map(() => '?').join(',');
                    // Get package includes
                    const includeSql = `
                                    SELECT
                                        id,
                                        package_detail_id,
                                        icon,
                                        name
                                    FROM package_includes
                                    WHERE package_detail_id
                                    IN (${placeholders})
                                    ORDER BY id
                                `;

                    db.query(includeSql, packageDetailIds, (includeError, includeResults) => {
                        if (includeError) {
                            return res.status(500).json({
                                success: false,
                                message: 'Package includes database error'
                            });
                        }
                        // Attach includes
                        const packagesWithIncludes =
                            results.map(pkg => {
                                const includes =
                                    includeResults.filter(
                                        include => include.package_detail_id === pkg.packageDetailId
                                    );
                                return { ...pkg, includes };
                            });
                        // Final success response
                        return res.status(200).json({
                            success: true,
                            status: 'PACKAGES_FOUND',
                            data: packagesWithIncludes
                        });
                    }
                    );
                    return;
                }

                // 5. Duration exists - But budget is NOT enough - Find minimum package price

                const minimumPriceSql = `
                                SELECT
                                    MIN(price) AS minimumPrice
                                FROM package_details
                                WHERE sector = ?
                                AND duration_days = ?
                            `;
                db.query(minimumPriceSql, [sector, userDays], (minimumError, minimumResults) => {
                    if (minimumError) {
                        return res.status(500).json({
                            success: false,
                            message: 'Minimum price database error'
                        });
                    }
                    const minimumPrice = minimumResults[0]?.minimumPrice;
                    // Budget is not enough
                    return res.status(200).json({
                        success: true,
                        data: [],
                        status: 'BUDGET_NOT_ENOUGH',
                        message: `No packages are available for ${userDays} days within your selected budget.`,
                        suggestion: {
                            type: 'budget',
                            requestedDays: userDays,
                            requestedBudget: userBudget,
                            minimumPrice: minimumPrice != null ? Number(minimumPrice) : null
                        },
                        sentence: {
                            img: '../../../assets/images/package_budget',
                            imgAlt: 'Change Budget',
                            title: `Packages for ${userDays} days are available from ₹${Number(minimumPrice).toLocaleString('en-IN')}.`,
                            msg: 'Your selected budget is not enough for the available packages. Would you like to adjust your budget or travel duration?',
                            buttons: [
                                {
                                    label: 'Change Budget',
                                    action: 'CHANGE_BUDGET'
                                }
                            ]
                        }
                    });
                }
                );
            }
            );
        }
        );
    }
    );
};

module.exports = {
    getPackages
};