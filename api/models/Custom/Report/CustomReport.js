/**
* CustomReport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	// connection
	connection: 'ngmCustomReportsServer',

  // strict schema
  // should be strict for defined attributes and be able to save arbitrary attributes
	schema: true,

	// attributes
	attributes: {
		// region/country
    adminRpcode: {
			type: 'string',
			required: true
    },
    adminRname: {
			type: 'string',
			required: true
    },
    admin0pcode: {
			type: 'string',
			required: true
    },
    admin0name: {
			type: 'string',
			required: true
    },
		organization_id: {
			type: 'string',
			required: true
		},
		organization_tag: {
			type: 'string',
			required: true
		},
		organization: {
			type: 'string',
			required: true
    },
    // programme_partners: {
		// 	type: 'array'
		// },
		// implementing_partners: {
		// 	type: 'array'
		// },
		cluster_id: {
			type: 'string'
		},
		cluster: {
			type: 'string'
		},
    cluster_ids: {
			type: 'array'
		},
		name: {
			type: 'string',
			required: true
		},
		position: {
			type: 'string',
			required: true
		},
		phone: {
			type: 'string',
			required: true
		},
		email: {
			type: 'string',
			unique: true,
			required: true
		},
		username: {
			type: 'string',
			required: true
		},

		// // project
		// project_hrp_code: {
		// 	type: 'string',
		// 	required: true
		// },

// //New column plans and components
// 		plan_component: {
// 			type: 'array'
// 		},
// 		project_acbar_partner: {
// 			type: 'boolean'
// 		},
// 		project_code: {
// 			type: 'string'
// 		},
		project_id: {
			type: 'string',
			required: true
		},
		project_status: {
			type: 'string',
			defaultsTo: 'new'
		},
		project_title: {
			type: 'string',
			required: true
		},
		project_description: {
			type: 'string',
      defaultsTo: ""
		},
		project_start_date: {
			type: 'date',
			required: true
		},
		project_end_date: {
			type: 'date',
			required: true
		},
		// project_budget: {
		// 	type: 'float'
		// },
		// project_budget_currency: {
		// 	type: 'string',
		// 	required: true
		// },
		// mpc_purpose: {
		// 	type: 'array'
		// },
		// mpc_purpose_cluster_id: {
		// 	type: 'string'
    // },
    // mpc_purpose_type_id: {
		// 	type: 'string'
    // },
    // mpc_purpose_type_name: {
		// 	type: 'string'
		// },
		// inter_cluster_activities: {
		// 	type: 'array'
		// },
		// project_donor: {
		// 	type: 'array'
		// },
		// activity_type: {
		// 	type: 'array',
		// 	required: true
		// },
		// activity_description: {
		// 	type: 'array'
		// },

		// // SOs
		// strategic_objectives: {
		// 	type: 'array'
		// },

		// report
		report_active: {
			type: 'boolean',
			defaultsTo: true
		},
		report_status: {
			type: 'string',
			defaultsTo: 'todo'
    },
    report_week: {
			type: 'integer',
			// required: true
		},
		report_month: {
			type: 'integer',
			// required: true
		},
		report_year: {
			type: 'integer',
			// required: true
		},
		report_submitted: {
			type: 'date'
		},
		reporting_period: {
			type: 'date',
			required: true
    },
    reporting_period_end: {
			type: 'date',
			required: true
    },
		reporting_due_date: {
			type: 'date',
			required: true
		},
		// report_validation:{
		// 	type: 'string',
		// },
    // add reference to Locations
    // locations: {
    //   collection: 'location',
    //   via: 'report_id'
    // },

    // // location groups
		// location_groups_check: {
		// 	type: 'boolean'
		// },

		// location_groups: {
		// 	type: 'array'
		// },

		// location_grouping_by: {
		// 	type: 'string'
		// },

  notes: {
    type: 'string'
  },

	// project_details
	project_details: {
		type: 'array'
	},

  reporting_period_type: {
    type: 'string',
    required: true
  },

  // type of custom report
  report_type_id: {
    type: 'string',
    required: true
  },

  report_type_name: {
    type: 'string',
    required: true
  },

		version: {
			type: 'string',
			required: true
		}

	},

	cluster_ids: {
		type: 'array'
	},
	clusters: {
		type: 'array'
	},

  // updateOrCreate
    // http://stackoverflow.com/questions/25936910/sails-js-model-insert-or-update-records
  updateOrCreate: function( parent, criteria, values ){
    var self = this; // reference for use by callbacks

    // if exists
    if( criteria.id ){
      return self.update( criteria, values );
    }else{
			// set relation
			for ( key in parent ){ values[ key ] = parent[ key ]; }
      return self.create( values );
    }

  }

};
