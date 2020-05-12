frappe.query_reports["Car Availability"] = {
        "filters": [    
                
                {
                        "fieldname":"as_on_date",
                        "label": __("As On Date"),
                        "fieldtype": "Date",
                        "default": frappe.datetime.get_today(),
            "reqd": 1
        }

        ]
}

