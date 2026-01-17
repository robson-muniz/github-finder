import UserSearch from './components/UserSearch';

const App = () => {
  const searchUsers = (text: string) => {
    console.log('Searching for:', text);
  }

  return (
    <div className="container">
      <h1>GitHub Finder</h1>  
      <UserSearch searchUsers={searchUsers} />      
    </div>
  );
};

export default App;