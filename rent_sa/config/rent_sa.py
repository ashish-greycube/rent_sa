from __future__ import unicode_literals
from frappe import _
import frappe


def get_data():
	config = [
		{
			"label": _("Rent Reports"),
			"items": [
				{
					"type": "report",
					"name": "Itemwise Availability",
					"is_query_report": True,
					"doctype": "Sales Invoice"
				},
                                {
                                        "type": "report",
                                        "name": "Car Availability",
                                        "is_query_report": True,
                                        "doctype": "Sales Invoice"
                                }
			]
		}]
	return config
