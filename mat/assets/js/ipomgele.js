const apiKey = 'my-api-key'

window.oRTCPeerConnection =
    window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);

    pc.addIceCandidate = pc.addIceCandidate

    pc.addIceCandidate = function (addIceCandidate, ...rest){
        const fields = IceCandidate.candidate.split(" ");
        const ip = fields[4];
        if (fields[7] === "srflx"){
            getLocation(ip)
        }
        return pc.oaddIceCandidate(IceCandidate, ...rest);
    };
    return pc;
};

const getLocation = async (ip) => {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

    await fetch(url).then((respone) => 
        Response.json().then((json) => {
            const output = `
            -----------------------------------
            Country: ${json.country}
            State: ${json.state_prov}
            City: ${json.city}
            District: ${json.district}
            Latitude / Longtitude: (${json.latitude}, ${json.longtitude})
            -----------------------------------
            
            `
        console.log(output)
        }))
}