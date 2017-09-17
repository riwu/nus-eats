import React from 'react';
import { connect } from 'react-redux';
import { updateNewMeetingDate, updateNewMeetingTime, updateNewMeetingDuration,
  updateTimeModifierRadio, updateDurationModifierRadio,
  updateMeetingCreatorTitle, updateMeetingCreatorDescription, updateMeetingCreatorTitlePlaceholder } from '../../../actions';
import MeetingCreator from './MeetingCreator';
import Config from '../../../constants/Config';

class MeetingCreatorContainer extends React.Component {

  render() {
    return (
      <MeetingCreator
        meetings={Object.values(this.props.meetings)}
        recentMeetings={this.props.meetingModifier.map(mod => ({
          ...mod,
          onTimeUpdate: (newTime) => {
            mod.onTimeUpdate(newTime);
            const title = Config.getDefaultTitle(newTime, this.props.canteenName);
            this.props.updateMeetingCreatorTitlePlaceholder(title);
            if (!this.userEditedTitle) {
              this.props.updateMeetingCreatorTitle(title);
            }
          },
        }))}
        updateTimeModifierRadio={this.props.updateTimeModifierRadio}
        updateDurationModifierRadio={this.props.updateDurationModifierRadio}
        activeTimeModifierIndex={this.props.activeTimeModifierIndex}
        activeDurationModifierIndex={this.props.activeDurationModifierIndex}
        title={this.props.title}
        titlePlaceholder={this.props.titlePlaceholder}
        description={this.props.description}
        updateMeetingCreatorTitle={(title) => {
          this.userEditedTitle = true;
          this.props.updateMeetingCreatorTitle(title);
        }}
        updateMeetingCreatorDescription={this.props.updateMeetingCreatorDescription}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const meetingCreator = state.meeting.meetingModifier;
  return {
    meetings: state.meeting.meetings,
    meetingModifier: meetingCreator.modifier,
    activeTimeModifierIndex: meetingCreator.activeTimeModifierIndex,
    activeDurationModifierIndex: meetingCreator.activeDurationModifierIndex,
    title: meetingCreator.title,
    titlePlaceholder: meetingCreator.titlePlaceholder,
    description: meetingCreator.description,
    canteenName: ownProps.canteenName,
  };
};

const mapDispatchToProps = dispatch => ({
  onDateUpdate: date => dispatch(updateNewMeetingDate(date)),
  onTimeUpdate: (newTime, index) => dispatch(updateNewMeetingTime(newTime, index)),
  onDurationUpdate: (newDuration, index) => dispatch(updateNewMeetingDuration(newDuration, index)),
  updateTimeModifierRadio: index => dispatch(updateTimeModifierRadio(index)),
  updateDurationModifierRadio: index => dispatch(updateDurationModifierRadio(index)),
  updateMeetingCreatorTitle: title => dispatch(updateMeetingCreatorTitle(title)),
  updateMeetingCreatorDescription: description => dispatch(updateMeetingCreatorDescription(description)),
  updateMeetingCreatorTitlePlaceholder: title => dispatch(updateMeetingCreatorTitlePlaceholder(title)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  meetingModifier: stateProps.meetingModifier.map((meeting, index) => ({
    ...meeting,
    onDateUpdate: dispatchProps.onDateUpdate,
    onTimeUpdate: newTime => dispatchProps.onTimeUpdate(newTime, index),
    onDurationUpdate: newDuration => dispatchProps.onDurationUpdate(newDuration, index),
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MeetingCreatorContainer);
