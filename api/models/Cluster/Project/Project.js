/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	// connection
	connection: 'ngmHealthClusterServer',

	// strict schema
	schema: true,

	// attributes
	attributes: {
		// region/country id
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
		cluster_id: {
			type: 'string',
			required: true
		},
		cluster: {
			type: 'string',
			required: true
		},
		username: {
			type: 'string',
			required: true
		},
		email: {
			type: 'string',
			required: true
		},

		// add reference to Target beneficiaries
		// target_beneficiaries: {
		// 	collection: 'targetbeneficiaries',
		// 	via: 'project_id'
		// },	
		// // add reference to Target Locations
		// target_locations: {
		// 	collection: 'targetlocation',
		// 	via: 'project_id'
  	// },
		// // add reference to Budget Progress
		// project_budget_progress: {
		// 	collection: 'budgetprogress',
		// 	via: 'project_id'
		// },

		// flag to manage location updates
		// update_locations: {
		// 	type: 'boolean',
		// 	defaultsTo: false
		// },

		// project
		project_hrp_code: {
			type: 'string',
			required: true
		},
		project_status: {
			type: 'string',
			defaultsTo: 'active'
		},
		project_title: {
			type: 'string',
			required: true
		},
		project_description: {
			type: 'string',
			required: true
		},
		project_start_date: {
			type: 'date',
			required: true
		},
		project_end_date: {
			type: 'date',
			required: true
		},
		project_budget: {
			type: 'float',
			required: true
		},
		project_budget_currency: {
			type: 'string',
			required: true
		},
		inter_cluster_activities: {
			type: 'array'
		},
		project_donor: {
			type: 'array'
		},
		activity_type: {
			type: 'array',
			required: true
		},
		activity_description: {
			type: 'array'
		},

		// SOs
		strategic_objectives: {
			type: 'array'
		},

		// target beneficiaries
		category_type: {
			type: 'array'
		},
		beneficiary_type: {
			type: 'array'
		},

		// target locations
		admin1pcode: {
			type: 'array'
		},
		admin2pcode: {
			type: 'array'
		},





		/*********** 2016 *************/ 
		project_code: {
			type: 'string'
		},
		project_type: {
			type: 'array'
		},
		project_type_other: {
			type: 'string'
		},
		project_donor_other: {
			type: 'string'
		},
		activity_description_other: {
			type: 'string'
		},
		implementing_partners_checked: {
			type: 'boolean',
			defaultsTo: false
		},
		implementing_partners: {
			type: 'string'
		}

	},

  // updateOrCreate 
    // http://stackoverflow.com/questions/25936910/sails-js-model-insert-or-update-records
  updateOrCreate: function( values, cb ){
    var self = this; // reference for use by callbacks
    // If no values were specified, return []
    if (!values) cb( false, [] );

    if( values.id ){
    	// update returns array, need the object
      self.update({ id: values.id }, values, function( err, update ){
				if(err) return cb(err, false);
				cb( false, update[0] );
      });
    }else{
      self.create(values, cb);
    }

  },

	// afterCreate
	afterCreate: function( project, next ) {

		// generate an array of reports
		var reports = getProjectReports( project );

		// create reports
		Report
			.create( reports )
			.exec( function( err, reports ) {

				// return error
				if ( err ) return next( err );

				// next!
				next();
				
		});
			
	},

	// update report locations
	afterUpdate: function( project, next ) {

		// update project details of collections ?
		next();

	}

};


// generate an array of reports
function getProjectReports( project ) {

	// tools
	var moment = require('moment'),
			_under = require('underscore');
	
	// variables
	var reports = [],
			s_date = moment( '2017-01-01' ), // start of 2017
			e_date = moment().subtract( 1, 'M' ).endOf( 'month' ); // Current reporting period ( last month )

	// number of reports
	var reports_duration = moment.duration( e_date.diff( s_date ) ).asMonths().toFixed(0);

	// for each report month
	for ( m = 0; m < reports_duration; m++ ) {

		// create report
		var report = {
			project_id: project.id,
			report_status: 'todo',
			report_active: true,
			report_month: moment( s_date ).add( m, 'M' ).month(),
			report_year: moment( s_date ).add( m, 'M' ).year(),
			reporting_period: moment( s_date ).add( m, 'M' ).set('date', 1).format(),
			reporting_due_date: moment( s_date ).add( m+1, 'M' ).set('date', 15).format()
		};

		// clone project
		var p = _under.clone( project );
						delete p.id;

		// add report with p to reports
		reports.push( _under.extend( {}, report, p ) );

	}

	// return the reports for the project period
	return reports;

};

