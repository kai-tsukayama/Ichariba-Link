'use client';

import React, { useMemo, useState } from 'react'
import EventGenerateModal from '../organisms/EventGenerateModal'
import { EventInput } from '@/app/interfaces/Event';

const EventGenerateField = () => {
    const [post, setPost] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [prefecture, setPrefecture] = useState("");
    const [city, setCity] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const eventInput = useMemo<EventInput>(() => ({
        title,
        startDate,
        endDate,
        description,
        prefecture,
        city,
        imageFile: imageFile ?? undefined,
    }), [title, startDate, endDate, description, prefecture, city, imageFile])

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title) newErrors.title = "イベント名を入力してください";
        if (!startDate || !endDate) newErrors.date = "日時を入力してください";
        if (!description) newErrors.description = "詳細を入力してください";
        if (!prefecture || !city) newErrors.place = "場所（都道府県・市区町村）を入力してください";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className='bg-white h-[calc(100%-0.5rem)] mt-2 px-10 py-5 flex overflow-hidden'>
            <div>
                {post && <EventGenerateModal onClose={() => setPost(false)} event={eventInput} />}
            </div>
            <div className='flex flex-col'>
                <div className='mb-3'>
                    <h1 className='text-2xl font-bold mb-3'>イベント名</h1>
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`border ${errors.title ? 'border-red-500' : 'border-[#3BB1FF]'} w-180 mr-20`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className='mb-3 w-180'>
                    <h2 className='text-xl mb-2'>日時</h2>
                    <div className='flex'>
                        <input
                            type="datetime-local"
                            name=""
                            id=""
                            className={`border ${errors.date ? 'border-red-500' : 'border-[#3BB1FF]'} w-full flex-1`}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className='flex-1 text-center'>～</span>
                        <input
                            type="datetime-local"
                            name=""
                            id=""
                            className={`border ${errors.date ? 'border-red-500' : 'border-[#3BB1FF]'} w-full flex-1`}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                    <h2 className='text-xl mb-2'>詳細</h2>
                    <textarea
                        name=""
                        id=""
                        className={`border ${errors.description ? 'border-red-500' : 'border-[#3BB1FF]'} h-60 w-180`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
            </div>
            <div>
                <h2 className='text-xl  mb-2'>場所</h2>
                <div className="flex flex-col items-start">
                    <input
                        type="text"
                        className={`border ${errors.place ? 'border-red-500' : 'border-[#3BB1FF]'} mb-3`}
                        value={prefecture}
                        onChange={(e) => setPrefecture(e.target.value)}
                        placeholder="都道府県"
                    />
                    <input
                        type="text"
                        className={`border ${errors.place ? 'border-red-500' : 'border-[#3BB1FF]'} mb-3`}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="市区町村"
                    />
                    {errors.place && <p className="text-red-500 text-sm mb-3">{errors.place}</p>}
                </div>
                <p className='text-xl mb-4'>のイベント</p>
                <div className="flex flex-col gap-3 mt-4">
                    {previewUrl && (
                        <div className="mb-2 flex justify-center">
                            <img src={previewUrl ?? ""} alt="Preview" className="w-64 h-36 object-cover rounded-md" />
                        </div>
                    )}
                    <label className="w-50 py-3 rounded-full bg-[#00D957] text-white font-bold text-center cursor-pointer">
                        画像のアップロード
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setImageFile(file);
                                    setPreviewUrl(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </label>

                    <button
                        className="w-50 py-3 rounded-full bg-[#3BB1FF] text-white font-bold cursor-pointer"
                        onClick={() => {
                            if (validate()) {
                                setPost(true);
                            }
                        }}
                    >
                        作成する
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EventGenerateField