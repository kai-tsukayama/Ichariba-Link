'use client';

import React, { useMemo, useState } from 'react';
import EventGenerateModal from '../organisms/EventGenerateModal';
import { EventInput } from '@/app/interfaces/Event';
import { prefectureOptions } from '@/app/seeds/LocationSeeds';

const EventGenerateField = () => {
  const [post, setPost] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [prefectureCode, setPrefectureCode] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedPrefecture = useMemo(
    () => prefectureOptions.find((p) => p.code === prefectureCode) ?? null,
    [prefectureCode],
  );

  const eventInput = useMemo<EventInput>(
    () => ({
      title,
      startDate,
      endDate,
      description,
      prefecture: selectedPrefecture?.name ?? '',
      city: '',
      imageFile: imageFile ?? undefined,
      imageUrl: imageDataUrl ?? undefined,
    }),
    [title, startDate, endDate, description, selectedPrefecture, imageFile, imageDataUrl],
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = 'イベントタイトルを入力してください';
    if (!startDate || !endDate) newErrors.date = '開始・終了日時を入力してください';
    if (!description) newErrors.description = '説明文を入力してください';
    if (!prefectureCode) newErrors.place = '都道府県を選択してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="bg-white h-[calc(100%-0.5rem)] mt-2 px-10 py-5 flex overflow-hidden">
      <div>{post && <EventGenerateModal onClose={() => setPost(false)} event={eventInput} />}</div>
      <div className="flex flex-col">
        <div className="mb-3">
          <h1 className="text-2xl font-bold mb-3">イベントタイトル</h1>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border ${errors.title ? 'border-red-500' : 'border-[#3BB1FF]'} w-180 mr-20`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-3 w-180">
          <h2 className="text-xl mb-2">日時</h2>
          <div className="flex">
            <input
              type="datetime-local"
              className={`border ${errors.date ? 'border-red-500' : 'border-[#3BB1FF]'} w-full flex-1`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="flex-1 text-center">〜</span>
            <input
              type="datetime-local"
              className={`border ${errors.date ? 'border-red-500' : 'border-[#3BB1FF]'} w-full flex-1`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <div>
          <h2 className="text-xl mb-2">説明</h2>
          <textarea
            className={`border ${errors.description ? 'border-red-500' : 'border-[#3BB1FF]'} h-60 w-180`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>
      <div>
        <h2 className="text-xl  mb-2">開催場所（都道府県）</h2>
        <div className="flex flex-col items-start">
          <select
            className={`border ${errors.place ? 'border-red-500' : 'border-[#3BB1FF]'} mb-3 w-60`}
            value={prefectureCode}
            onChange={(e) => setPrefectureCode(e.target.value)}
          >
            <option value="">都道府県を選択</option>
            {prefectureOptions.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.place && <p className="text-red-500 text-sm mb-3">{errors.place}</p>}
        </div>
        <p className="text-xl mb-4">イベントの画像</p>
        <div className="flex flex-col gap-3 mt-4">
          {previewUrl && (
            <div className="mb-2 flex justify-center">
              <img src={previewUrl ?? ''} alt="Preview" className="w-64 h-36 object-cover rounded-md" />
            </div>
          )}
          <label className="w-50 py-3 rounded-full bg-[#00D957] text-white font-bold text-center cursor-pointer">
            画像をアップロード
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setImageFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImageDataUrl(reader.result as string);
                  };
                  reader.readAsDataURL(file);
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
  );
};

export default EventGenerateField;
