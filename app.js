const checkServer = () => (new Promise((res, rej)=> {
    setTimeout(() => res("Server on"), 1500);
}))

const initialization = async () => {
    try {
        const data = await checkServer()
        if (!data) throw new Error("Error:Failed to get Data");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

initialization()
