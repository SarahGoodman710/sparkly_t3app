import NavBar from './header/navbar';

const HomeLayout = ({ children }) => {
    return (
        <NavBar />
    );
};

HomeLayout.auth = true

export default HomeLayout;