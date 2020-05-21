frappe.ui.form.on('Sales Invoice', {
	validate(frm) {
        frappe.call({
            method: 'rent_sa.rent_sa.api.check_car_availability',
            args: {
                'vehicle_cf': frm.doc.vehicle_cf,
                'delivery_from_time_cf': frm.doc.delivery_from_time_cf,
                'delivery_to_time_cf': frm.doc.delivery_to_time_cf,
                'return_from_time_cf': frm.doc.return_from_time_cf,
                'return_to_time_cf': frm.doc.return_to_time_cf
            }
            
        }).then(r => {
            console.log(r)
    });
	}
})