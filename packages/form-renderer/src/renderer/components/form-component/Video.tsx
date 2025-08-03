import { TVideo } from "../../types/elements";

interface Props {
    item: TVideo;
}

const Video = ({ item }: Props) => {
    if (!item.isVisible) return null;

    // Determine base URL based on privacy mode
    const baseUrl = item.privacyEnhancedMode
        ? "https://www.youtube-nocookie.com/embed/"
        : "https://www.youtube.com/embed/";

    // Build URL parameters
    const params = new URLSearchParams();
    if (item.showControlButton === false) {
        params.append("controls", "0"); // Hide controls
    }

    // Construct final URL
    const videoUrl = `${baseUrl}${item.videoUrl}${params.toString() ? `?${params.toString()}` : ""}`;

    return (
        <div
            className="col-span-12"
            style={{
                marginTop: `${item.spaceTop?.value || 0}${item.spaceTop?.unit || "px"}`,
                marginBottom: `${item.spaceBottom?.value || 0}${item.spaceBottom?.unit || "px"}`
            }}
        >
            <iframe
                width={`${item.width?.value || "100"}${item.width?.unit || "%"}`}
                height={`${item.height?.value || "200"}${item.height?.unit || "px"}`}
                src={videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
            />
        </div>
    );
};

export default Video;