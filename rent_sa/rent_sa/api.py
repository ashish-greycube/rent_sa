import frappe
from frappe.utils import get_datetime

@frappe.whitelist()
def check_car_availability(vehicle_cf,delivery_from_time_cf,delivery_to_time_cf,return_from_time_cf,return_to_time_cf):
    print('-------------------------------------')
    print(vehicle_cf,delivery_from_time_cf,delivery_to_time_cf,return_from_time_cf,return_to_time_cf)
    car_availability = frappe.db.sql('''
        select name from `tabSales Invoice` as SI
        where
        SI.docstatus=1 and
        SI.vehicle_cf=%s and
        %s NOT BETWEEN SI.delivery_from_time_cf and SI.delivery_to_time_cf and
        %s NOT BETWEEN SI.delivery_from_time_cf and SI.delivery_to_time_cf and
        %s NOT BETWEEN SI.return_from_time_cf and SI.return_to_time_cf and
        %s NOT BETWEEN SI.return_from_time_cf and SI.return_to_time_cf 
        order by name desc limit 1''', (vehicle_cf, delivery_from_time_cf,delivery_to_time_cf,return_from_time_cf,return_to_time_cf), as_dict=True)
    print(car_availability)
    return car_availability


