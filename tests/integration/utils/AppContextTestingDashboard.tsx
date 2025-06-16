import { useLoginDetails } from '../../../src/contexts/AppContext';

export const AppContextTestingDashboard: React.FC = () => {
  const { loginDetails } = useLoginDetails();
  return (
    <div>
      <div
        data-testid="loginDetails.password"
        data-value={loginDetails?.password}
      />
      <div
        data-testid="loginDetails.securityNumber"
        data-value={loginDetails?.securityNumber}
      />
      {loginDetails?.securityQuestions.map((securityQuestion, index) => (
        <div key={index}>
          <div
            data-testid={`loginDetails.securityQuestions.${index}.question`}
            data-value={securityQuestion.question}
          />
          <div
            data-testid={`loginDetails.securityQuestions.${index}.answer`}
            data-value={securityQuestion.answer}
          />
        </div>
      ))}
    </div>
  );
};
