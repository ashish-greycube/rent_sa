frappe.ui.form.on('Sales Invoice', {
    validate: function (frm) {
        frm.trigger('check_car_availability');
    },
    check_car_availability: function (frm) {
        frappe.call({
            method: 'rent_sa.rent_sa.api.check_car_availability',
            args: {
                'vehicle_cf': frm.doc.vehicle_cf,
                'delivery_from_time_cf': frm.doc.delivery_from_time_cf,
                'delivery_to_time_cf': frm.doc.delivery_to_time_cf,
                'return_from_time_cf': frm.doc.return_from_time_cf,
                'return_to_time_cf': frm.doc.return_to_time_cf
            },
            async: false,
            // freeze the screen until the request is completed
            freeze: true,
            callback: (r) => {
                // on success
                if (r.message) {
                    if (r.message.length > 0) {
                        frappe.validated = false;
                        frappe.throw(__('Sales Invoice {0} has similar booking.', [r.message[0].name]));
                        return false
                    } else {
                        return true
                    }
                }
            },
            error: (r) => {
                // on error
                console.log('error', r)
            }
        })
    }
})