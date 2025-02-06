type WeatherProps = {
    temperature: number;
    weather: string;
    location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {location}
            </h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Condition</span>
                    <span className="font-medium text-gray-800">{weather}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temperature</span>
                    <span className="font-medium text-gray-800">{temperature}°C</span>
                </div>
            </div>
        </div>
    );
};