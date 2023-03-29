import PropTypes from 'prop-types';
import Section from 'components/Section/Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Statistics/Notification';
import { Container, ContainerBtn, ContainerText } from './Feedback.styled';

const Feedback = ({ feedback, onLeaveFeedback }) => {
  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((sum, value) => {
      return sum + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = total => {
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const percentage = countPositiveFeedbackPercentage(total);

  return (
    <Container>
      <Section title="Please leave feedback">
        <ContainerBtn>
          <FeedbackOptions
            options={Object.keys(feedback)}
            onLeaveFeedback={onLeaveFeedback}
          />
        </ContainerBtn>
      </Section>

      <Section title="Statistics">
        <ContainerText>
          {total > 0 ? (
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={total}
              positivePercentage={percentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </ContainerText>
      </Section>
    </Container>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.shape({
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
  }),
  onLeaveFeedback: PropTypes.func,
};

export default Feedback;
