export class Cookie {
    public static parseToken(token: string) {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join("")
        )
        return JSON.parse(jsonPayload)
    }

    public static set(key: string, value: string, expirationInHrs: number) {
        const d = new Date()
        d.setTime(d.getTime() + expirationInHrs * 60 * 60 * 1000)
        const exp = "expires=" + d.toUTCString()
        document.cookie = `${key}=${value};${exp};SameSite=Strict;path=/`
    }

    public static get(key: string) {
        const name = key + "="
        const ca = document.cookie.split(";")
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == " ") {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }

    public static remove(name: string) {
        document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
    }

    public static removeAll() {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                        new Date().toUTCString() +
                        ";path=/"
                )
        })
    }
}
