"use client"
import { Dialog } from "../../Dialog";
import { IconCheck } from "../../../../icons";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    onChange?: (e: string) => void;
    value?: string;
}

const PickerDialog = ({ open, onClose, onChange, value }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[600px]"
        >
            <h5 className="text-gray-700 font-semibold text-xl px-5 py-4">Social Icon</h5>
            <hr className="border-gray-100" />
            <div className="p-5 grid grid-cols-8 gap-4">
                {iconLists.map((item, i) => (
                    <div key={i} className="relative cursor-pointer" onClick={() => {
                        onChange?.(item.url)
                        onClose();
                    }}>
                        <img src={item.url} alt={item.name} width={200} height={200} className="rounded-sm" />
                        {item.url === value &&
                            <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center text-white">
                                <IconCheck />
                            </div>
                        }
                    </div>
                ))}
            </div>
        </Dialog>
    );
};

export default PickerDialog;


const iconLists = [
    { name: "Facebook", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/facebook.png" },
    { name: "Twitter", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/twitter.png" },
    { name: "X", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/x.png" },
    { name: "LinkedIn", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/linkedin.png" },
    { name: "Instagram", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/instagram.png" },
    { name: "Pinterest", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/pinterest.png" },
    { name: "Vimeo", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/vimeo.png" },
    { name: "YouTube", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/youtube.png" },
    { name: "Snapchat", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/snapchat.png" },
    { name: "WhatsApp", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/whatsapp.png" },
    { name: "Reddit", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/reddit.png" },
    { name: "Messenger", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/messenger.png" },
    { name: "Tripadvisor", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/tripadvisor.png" },
    { name: "Meetup", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/meetup.png" },
    { name: "ProductHunt", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/producthunt.png" },
    { name: "RSS", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/rss.png" },
    { name: "Tinder", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/tinder.png" },
    { name: "Tumblr", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/tumblr.png" },
    { name: "AppleMusic", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/applemusic.png" },
    { name: "Spotify", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/spotify.png" },
    { name: "SoundCloud", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/soundcloud.png" },
    { name: "Yelp", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/yelp.png" },
    { name: "Medium", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/medium.png" },
    { name: "Skype", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/skype.png" },
    { name: "Flickr", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/flickr.png" },
    { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/github.png" },
    { name: "GooglePlus", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/googleplus.png" },
    { name: "Discord", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/discord.png" },
    { name: "Telegram", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/telegram.png" },
    { name: "TikTok", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/tiktok.png" },
    { name: "Email", url: "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/email.png" }
];
