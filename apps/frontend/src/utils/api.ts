const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

type FetchOpts = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    token?: string | null;
}

async function api(path: string, opts: FetchOpts) {
    const { token, method = 'GET', headers = {}, body } = opts;
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if(!res.ok) throw (data ?? { message: res.statusText });
    return data;
}

export const chatApi = {
    createdRoom: (token: string, partnerUserId: string) =>
        api("/chat/rooms", {method: "POST", token, body: { partnerUserId }}),
    listRooms: (token: string) =>
        api("/chat/rooms", {token}),
    sendMessage: (token:string, roomId: string, content: string) =>
        api('/chat/messages', { method: 'POST', token, body: { roomId, content } }),
    history: (token: string, roomId: string, limit = 20, cursor?: string) =>
        api(`/chat/messages?roomId=${roomId}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`, { token }),
};

export const userApi = {
    list: (token: string) =>
        api("/User", { token }),
    update: (token: string, body: any) =>
        api("/User", { method: "PATCH", token, body }),
};

export const authApi = {
    requestPasswordReset: (body: { name: string; email: string }) =>
        api("/auth/password/verify", { method: "POST", body }),
    resetPassword: (body: { token: string; newPassword: string }) =>
        api("/auth/password/reset", { method: "POST", body }),
};

export const eventApi = {
    list: (token?: string) =>
        api("/events", { token }),
    create: (token: string, body: any) =>
        api("/events", { method: "POST", token, body }),
    detail: (id: string, token?: string) =>
        api(`/events/${id}`, { token }),
};
