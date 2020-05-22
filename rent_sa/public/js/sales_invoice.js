frappe.ui.form.on('Sales Invoice', {
    validate: function (frm) {
        frm.trigger('check_dates');
        
    },
    check_dates:function(frm){
        console.log('check_dates')
        let delivery_from=frm.doc.delivery_from_time_cf
        let delivery_to=frm.doc.delivery_to_time_cf
        let return_from=frm.doc.return_from_time_cf
        let return_to=frm.doc.return_to_time_cf
        if (delivery_from>delivery_to || delivery_from>return_from || delivery_from>return_to) {
            frappe.validated = false;
            frappe.throw(__('Delivery from time should be least of all values.'));
            return false;
        }else if(return_to<delivery_from||return_to<delivery_to||return_to<return_from){
            frappe.validated = false;
            frappe.throw(__('Return to time should be greatest of all values.'));
            return false;            
        }else if(delivery_to >return_from || delivery_to<delivery_from){
            frappe.validated = false;
            frappe.throw(__('Incorrect delivery to time.'));
            return false;             
        }else if(return_from<delivery_from || return_from< delivery_to ||return_from > return_to ){
            frappe.validated = false;
            frappe.throw(__('Incorrect return from time.'));
            return false;       
        }
        else{
        frm.trigger('check_car_availability');
        }
    },
    check_car_availability: function (frm) {
        console.log('check_car_availability')
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
                        frappe.throw(__('Sales Invoice {0} has similar booking.', [
                            '<a href="#Form/Sales Invoice/'+r.message[0].name+'">' + r.message[0].name+ '</a>'
                            ]));
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