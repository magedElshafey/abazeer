// AuthCard.tsx
import { useTranslation } from "react-i18next";

interface AuthCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <main
      role="main"
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {title && (
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t(title)}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-text-gray dark:text-gray-400">
              {t(description)}
            </p>
          )}
        </header>
      )}

      <section aria-label={title || "Authentication form"}>{children}</section>
    </main>
  );
};

export default AuthCard;
