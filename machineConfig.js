import { Machine, assign } from "xstate";
export default Machine(
  {
    id: "meeting",
    initial: "idle",
    strict: true,
    context: {
      header: "",
      description: "",
    },
    states: {
      idle: {
        on: {
          START: "is_it_an_important_topic",
        },
      },
      is_it_an_important_topic: {
        entry: ["is_it_an_important_topic_entry"],
        on: {
          YES: "can_it_be_solved_by_collaborating_without_meeting",
          NO: "dont_meet",
        },
      },
      dont_meet: {
        entry: assign({
          header: "Don't Meet",
          description:
            "If the item isn't business-critical, consider dealing with this topic another way",
        }),
        type: "final",
      },
      can_it_be_solved_by_collaborating_without_meeting: {
        entry: assign({
          header: "Can it be solved by collaborating without meeting?",
          description: "",
        }),
        on: {
          YES: "use_other_collaboration_options",
          NO: "does_it_require_everyone_to_participate",
        },
      },
      use_other_collaboration_options: {
        entry: assign({
          header: "Use other collaboration options",
          description:
            "Collaborate on a task in your PM tool. Or run a survey, or do a quick group chat online",
        }),
        type: "final",
      },
      does_it_require_everyone_to_participate: {
        entry: assign({
          header: "Does it require everyone to participate?",
          description: "",
        }),
        on: {
          YES: "does_the_group_have_authority_to_act",
          NO: "limit_attendees",
        },
      },
      limit_attendees: {
        entry: assign({
          header: "Limit Attendees",
          description: "Limit the meeting to essential participants only",
        }),
        on: {
          DONE: "does_the_group_have_authority_to_act",
        },
      },
      does_the_group_have_authority_to_act: {
        entry: assign({
          header: "Does the group have authority to act?",
          description: "",
        }),
        on: {
          YES: "can_the_key_participants_and_decision_makers_attend",
          NO: "is_there_still_value",
        },
      },
      is_there_still_value: {
        entry: assign({
          header: "Is there still value?",
          description:
            "Can the group still add significant value by meeting? If not, stop here and don't meet",
        }),
        on: {
          YES: "is_there_pre_work_requested_of_key_participants",
        },
      },
      can_the_key_participants_and_decision_makers_attend: {
        on: {
          YES: "is_there_pre_work_requested_of_key_participants",
          NO: "is_there_still_value",
        },
      },
      is_there_pre_work_requested_of_key_participants: {
        on: {
          YES: "is_there_an_agenda_with_clear_goals",
          NO: "add_pre_work",
        },
      },
      add_pre_work: {
        on: {
          DONE: "is_there_an_agenda_with_clear_goals",
        },
      },
      is_there_an_agenda_with_clear_goals: {
        on: {
          YES: "is_there_enough_time_to_get_to_the_desired_outcome",
          NO: "add_agenda_and_goals",
        },
      },
      add_agenda_and_goals: {
        on: {
          DONE: "is_there_enough_time_to_get_to_the_desired_outcome",
        },
      },
      is_there_enough_time_to_get_to_the_desired_outcome: {
        on: {
          YES: "is_there_a_strong_meeting_facilitator",
          NO: "alter_goals_or_reschedule",
        },
      },
      alter_goals_or_reschedule: {
        on: {
          DONE: "is_there_a_strong_meeting_facilitator",
        },
      },
      is_there_a_strong_meeting_facilitator: {
        on: {
          YES: "lets_have_a_meeting",
          NO: "find_a_driver",
        },
      },
      find_a_driver: {
        on: {
          DONE: "lets_have_a_meeting",
        },
      },
      lets_have_a_meeting: {
        type: "final",
      },
    },
  },
  {
    actions: {
      is_it_an_important_topic_entry: assign({
        header: "Is it an important topic?",
        description: "",
      }),
    },
  }
);
