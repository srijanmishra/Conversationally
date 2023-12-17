const API_ROOT = import.meta.env.VITE_API_ROOT;

const getUser = async (user) => {
    const response = await fetch(API_ROOT + '/user?email=' + user.email, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' // necessary
        },
    });
    let data = await response.json();
    data = JSON.parse(data)
    return data;
}

export { getUser }