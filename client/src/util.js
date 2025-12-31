const getCurrentUser = () => {
    const user = localStorage.getItem("loginInUSer");
    if (user){
        return JSON.parse(user);
    } else {
        return null;
    }
}

export { getCurrentUser };