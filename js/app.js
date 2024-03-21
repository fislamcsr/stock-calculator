function calculate() {
	var lot = document.getElementById('lot').value;
	var purchase_price = document.getElementById('purchase_price').value;
	var sales_price = document.getElementById('sales_price').value;

	if (lot == "") {
		Swal.fire({
			icon: 'warning',
			text: 'Lot cannot be empty',
		});
	}
	else if (purchase_price == "") {
		Swal.fire({
			icon: 'warning',
			text: 'Purchase Price cannot be empty',
		});
	}
	else if (sales_price == "") {
		Swal.fire({
			icon: 'warning',
			text: 'Sales Price cannot be empty',
		});
	}

	var brokerage_fee_rate = document.getElementById('brokerage_fee_rate').value;
	var brokerage_fee_percentage = 0.00;
	var brokerage_fee_min = 0;
	switch(brokerage_fee_rate) {
	case "0.05% Min: 8":
		brokerage_fee_percentage = 0.05;
		brokerage_fee_min = 8;
		break;
	case "0.20% Min: 12":
		brokerage_fee_percentage = 0.20;
		brokerage_fee_min = 12;
		break;
	case "0.15% Min: 14":
		brokerage_fee_percentage = 0.15;
		brokerage_fee_min = 14;
		break;
	case "0.30% Min: 14":
		brokerage_fee_percentage = 0.30;
		brokerage_fee_min = 14;
		break;
	default:
		brokerage_fee_percentage = 0.30;
		brokerage_fee_min = 14;
	}

	const numberFormat = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 });
	function format(number) {
		return numberFormat.format(number.toFixed(2));
	}

	//Purchase calculations

	var purchase_value = lot * 100 * purchase_price;
	document.getElementById('purchase_value').innerText = format(purchase_value);

	var purchase_brokerage_fee = purchase_value * brokerage_fee_percentage / 100;
	document.getElementById('purchase_brokerage_fee_rate_label').innerText = purchase_brokerage_fee < brokerage_fee_min ? brokerage_fee_percentage.toFixed(2) + "%=" + format(purchase_brokerage_fee) + " Minimum: " + brokerage_fee_min : brokerage_fee_percentage.toFixed(2) + '%';

	purchase_brokerage_fee = purchase_brokerage_fee < brokerage_fee_min ? brokerage_fee_min : purchase_brokerage_fee;
	document.getElementById('purchase_brokerage_fee').innerText = format(purchase_brokerage_fee);

	var purchase_clearing_fee = purchase_value * 0.03 / 100;
	document.getElementById('purchase_clearing_fee').innerText = format(purchase_clearing_fee);

	var purchase_stamp_duty = parseInt(purchase_value / 1000, 10);
	if (purchase_value % 1000) {
		purchase_stamp_duty++;
	}
	document.getElementById('purchase_stamp_duty').innerText = format(purchase_stamp_duty);

	//Sales calculations
	var sales_value = lot * 100 * sales_price;
	document.getElementById('sales_value').innerText = format(sales_value);
	
	document.getElementById('sales_brokerage_fee_rate_label').innerText = brokerage_fee_percentage.toFixed(2) + '%';

	var sales_brokerage_fee = sales_value * brokerage_fee_percentage / 100;
	document.getElementById('sales_brokerage_fee_rate_label').innerText = sales_brokerage_fee < brokerage_fee_min ? brokerage_fee_percentage.toFixed(2) + "%=" + format(sales_brokerage_fee) + " Minimum: " + brokerage_fee_min : brokerage_fee_percentage.toFixed(2) + '%';

	sales_brokerage_fee = sales_brokerage_fee < brokerage_fee_min ? brokerage_fee_min : sales_brokerage_fee;

	document.getElementById('sales_brokerage_fee').innerText = format(sales_brokerage_fee);

	var sales_clearing_fee = sales_value * 0.03 / 100;
	document.getElementById('sales_clearing_fee').innerText = format(sales_clearing_fee);

	var sales_stamp_duty = parseInt(sales_value / 1000, 10);
	if (sales_value % 1000) {
		sales_stamp_duty++;
	}
	document.getElementById('sales_stamp_duty').innerText = format(sales_stamp_duty);

	//Total transaction cost
	var purchase_cost = purchase_brokerage_fee + purchase_clearing_fee + purchase_stamp_duty;
	var sales_cost = sales_brokerage_fee + sales_clearing_fee + sales_stamp_duty;
	var total_transaction_cost = purchase_cost + sales_cost; 
	document.getElementById('total_transaction_cost').innerText = format(total_transaction_cost);
	document.getElementById('purchase_cost').innerText = format(purchase_cost);
	document.getElementById('sales_cost').innerText = format(sales_cost);

	var total_purchase_cost = purchase_value + purchase_cost;
	var net_sales_proceeds = sales_value - sales_cost;
	document.getElementById('total_purchase_cost').innerText = format(total_purchase_cost);
	document.getElementById('net_sales_proceeds').innerText = format(net_sales_proceeds);

	var pl_amount = net_sales_proceeds - total_purchase_cost;
	var color = pl_amount > 0 ? "#09fd27" : "deeppink";
	var pl_amount_node = document.getElementById('pl_amount');
	pl_amount_node.style.color = color;
	pl_amount_node.innerText = format(pl_amount);

	var pl_percentage_node = document.getElementById('pl_percentage');
	pl_percentage_node.style.color = color;
	pl_percentage_node.innerText = format(100 * pl_amount / total_purchase_cost) + '%';
}
