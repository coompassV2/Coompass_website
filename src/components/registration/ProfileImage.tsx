
interface ProfileImageProps {
  imageUrl: string | null;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, alt }) => {
  if (!imageUrl) return null;
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className="w-[120px] h-[120px] rounded-full object-cover"
    />
  );
};
