import UserProvider from './user/UserProvider';
import MembershipProvider from './memberships/MembershipProvider';
import MessageProvider from './message/MessageProvider';

const AppProvider = ({ children }) => {
  return (
    <MessageProvider>
      <UserProvider>
        <MembershipProvider>{children}</MembershipProvider>
      </UserProvider>
    </MessageProvider>
  );
};

export default AppProvider;
