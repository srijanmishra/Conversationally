

export const getChatPageURL = (sysMsg, imgURL) => {
    const urlBase = window.location.origin; 

    const urlToCopy = urlBase + "/Conversationally/chat?sysMsg=" + encodeURIComponent(sysMsg) + "&img=" + encodeURIComponent(imgURL);
    return urlToCopy;
}