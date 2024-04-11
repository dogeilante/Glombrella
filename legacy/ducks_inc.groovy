glom {
    string title: 'Respected Developers'
    user member1: 'nathanwells'
    user member2: 'itsAditya'
    user member3: 'Edo K'
    glom glom_parent: 'root'
    glom[] children {
        glom child_glom1
        glom child_glom2 
        glom child_glom3
    }
}


user {
    user_id
    desc
    role 
    badge badges[] {
        {
            name: 'waddle 1 contributor'
            hours: 20
            proposals_completed: 3
            investment: $0
        }
    }
}

badge {
    name:
    hours:
    weight:
    investment:
}

proposal  {
	title: 'Market the Glombrella';
	Description: '';
    status: 'approved'
	Parent_prop: N/A;
	Scope: {
		responsible_glom: 'marketing_department'
		Vote_level: '2' // how many levels deep, a sub-proposal or edit, takes voting to approve.
    }
    proposal[] sub-proposals {
        // scoped with top-level proposal
    }
}