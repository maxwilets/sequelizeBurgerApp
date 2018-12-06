module.exports = (sequelize, DataTypes) => {
	var Customer = sequelize.define(
		"Customer",
		{
			customer_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 100]
				}
			}
		}
	);

	// establish association
	Customer.associate = models => {
		Customer.hasMany(models.Burger, {
            onDelete:'cascade'
        });
	};

	return Customer;
};