export interface Event {
    id: string,
    title: string,
    startData: Date,
    endData: Date,
    description: string,
    prefecture: string,
    city: string,
    imageId: string
}

export interface ImageData {
    id: string,
    filePath: string
}

export interface EventInput {
    title: string,
    startDate: string,
    endDate: string,
    description: string,
    prefecture: string,
    city: string,
    imageFile?: File
}
