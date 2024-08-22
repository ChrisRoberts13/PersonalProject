import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const signUp = async (email, password) => {
    let response = await api.post("users/signup/", {
        email: email,
        password: password,
    });
    if (response.status === 201) {
        let { user, token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return user;
    }
    alert("credentials failed");
    return null;
};

export const signIn = async (email, password) => {
    let response = await api.post("users/login/", {
        email: email,
        password: password,
    });
    if (response.status === 200) {
        let { email, token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return email;
    }
    alert("credentials failed");
    return null;
};

export const logOut = async () => {
    let response = await api.post("users/logout/")
    if (response.status === 204) {
        localStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"]
        return null
    }
    alert("Something went wrong during log out!")
}

export const confirmUser = async () => {
    let token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.get("users/");
        return response.data.user;
    }
    return null;

};

export const addFavoriteCharacters = async (character_id, user) => {
    console.log(character_id, user)
    let response = await api.post("/add_favorite_character/", {
        character_id: character_id,
        user: user
    })
    if(response.status != 404){
        console.log("added to favorites successfully")
    }
}

export const getFavoriteCharacters = async (user) => {
    let response = await api.get('/favorite_characters/', {user: user})
    return response.data
}

export const deleteFavoriteCharacter = async (character_id) => {
    let response = await api.delete(`/favorite_characters/${character_id}/delete/`);
    if (response.status === 204) {
        console.log("Character removed from favorites successfully");
    } else {
        alert("Failed to remove character from favorites");
    }
};

//Watchlist

export const addVideo = async (video_id, user) => {
    console.log(video_id, user)
    let response = await api.post("/add_video/", {
        video_id: video_id,
        user: user
    })
    if (response.status != 404) {
        console.log("added to watchlist successfully")
    }
}

export const getWatchlist = async (user) => {
    let response = await api.get('/watchlist/', { user: user })
    return response.data
}

export const deleteVideo = async (video_id) => {
    let response = await api.delete(`/watchlist/${video_id}/delete/`);
    if (response.status === 204) {
        console.log("Video is removed from watchlist successfully");
    } else {
        alert("Failed to remove video from watchlist");
    }
};