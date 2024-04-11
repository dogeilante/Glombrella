property Glomstitution {
	title: 'ducks_inc';
	Description: 'ducks incorporated is responsible for uniting the DESO NFT space';
	Parent_prop: N/A;
	Scope: {
		responsible_glom: 'root glom's
		Vote_level: '3'
	}
	proposal[] children_proposals {
        proposal governance_objects {
                title: 'objects used for governance of ducks_inc'
                scope: inherited
                children_proposals {
                    proposal user_object {
                        title: ''
                        description:;
                        inject_code {
                            user {
                                deso_id:'dogelord'

                            }
                        }
                    }
                    proposal Glom_object {
                        Description: 
                        scope: {
                            responsible_glom: ''
                        }
                        Inject_code {
                            Glom_size: 3;
                            define glom {
                                department:
                                responsible_glom:
                                child_gloms[] glom {

                                }
                            }
                    }
                }
		    }


        }
		
		proposal[] finances {
            title: 'badge'
            scope: {
                responsible_glom: 'root glom'
                Vote_level: 1 // only allow root glom to access
            }
            proposal[] children_proposals {
                milestone_badge {
                    title: 'waddle'
                    Description: ''
                    Inject_code { // Define 
                        release_schedule:
                            Start_date
                            Frequency
                        waddle_badge: {
                            waddle_number
                            hours_worked
                            proposals_completed
                        }
                    }
                }
                finance_distribution {
                    title: ''
                    description: ''
                    inject_code {
                        25% goes to ownership
                        25% goes to investors
                        25% goes to waddle achievers
                        25% goes to previous badges??
                    }
                }
            }

		}
		
	}
}


define how 
yield_Decision_on_a_proposal {
    import glom-object 
    number of days before expiration, and votes are delegated/not counted
    voting-rights per level
    2/3 vote equals decision done
    <glom-object></glom-object>
}