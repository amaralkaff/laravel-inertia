import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <ApplicationLogo className="w-12 h-12 mr-2" />
                        </div>
                        <nav>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 hover:text-gray-900 mr-4"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>

                    <div className="py-12">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome to Chirps
                            </h1>
                            <p className="text-gray-600">
                                A simple social media app built with Laravel and Inertia 2.0.
                            </p>
                        </div>
                    </div>

                    <footer className="text-center py-4 text-gray-500 text-sm">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </footer>
                </div>
            </div>
        </>
    );
}
