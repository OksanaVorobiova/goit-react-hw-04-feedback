import { useState } from 'react';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const handleBtnClick = ({ target: { name } }) => {
    if (name === 'good') {
      setGood(prev => (prev += 1));
    } else if (name === 'neutral') {
      setNeutral(prev => (prev += 1));
    } else if (name === 'bad') {
      setBad(prev => (prev += 1));
    }
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;

    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;

    return good === 0 ? 0 : ((good * 100) / countTotalFeedback()).toFixed(2);
  };

  const isFeedbackNotEmpty = () => {
    return Object.values(feedback).some(value => value > 0);
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={handleBtnClick}
          options={Object.keys(feedback)}
        />
      </Section>
      <Section title="Statistics">
        {isFeedbackNotEmpty() ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};
