import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Dropdown from './Dropdown';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: chirp.message,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('chirps.update', chirp.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex-1">
                <div className="flex justify-between items-center border-b pb-2">
                    <div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="font-semibold text-gray-800">{chirp?.user?.name || 'Anonymous'}</div>
                            <div className="ml-2 text-sm text-gray-600">{dayjs(chirp.created_at).fromNow()}</div>
                        </div>
                    </div>
                    {chirp.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" className="w-48">
                                <button 
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" 
                                    onClick={() => setEditing(true)}
                                >
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit
                                    </div>
                                </button>
                                <button 
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-red-700 hover:bg-red-50 focus:bg-red-50 transition duration-150 ease-in-out"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </div>
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit} className="mt-4">
                        <textarea
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <p className="mt-4 text-lg text-gray-900 leading-relaxed">{chirp.message}</p>
                }
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this chirp?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <Dropdown.Link
                                as="button"
                                href={route('chirps.destroy', chirp.id)}
                                method="delete"
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex justify-center items-center"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Delete
                            </Dropdown.Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}