const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

type FetchOpts = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    userId: string;
}

async function api(path: string, opts: FetchOpts) {
    const { userId, method = 'GET', headers = {}, body } = opts;
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId,
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if(!res.ok) throw await res.json();
    return res.json();
}

export const chatApi = {
    createdRoom: (userId: string, partnerUserId: string) =>
        api("/chat/rooms", {method: "POST", userId, body: { partnerUserId }}),
    listRooms: (userId: string) =>
        api("/chat/rooms", {userId}),
    sendMessage: (userId:string, roomId: string, content: string) =>
        api('/chat/messages', { method: 'POST', userId, body: { roomId, content } }),
    history: (userId: string, roomId: string, limit = 20, cursor?: string) =>
        api(`/chat/messages?roomId=${roomId}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`, { userId }),
};