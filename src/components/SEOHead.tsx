import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "SHELeadsIndia - Women Entrepreneurs Digital Marketing & AI Training",
  description = "Empower women entrepreneurs with digital marketing, AI training, and business solutions. Transform your business dreams into digital success with SHELeadsIndia.",
  keywords = "women entrepreneurs, digital marketing, AI training, business solutions, women empowerment, digital transformation, Pune, Nagpur, Nashik, India",
  image = "https://sheleadsindia.in/she-leads-logo.png",
  url = "https://sheleadsindia.in",
  type = "website",
  canonical
}) => {
  useEffect(() => {
    // Update page title for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: canonical || url,
      });
    }
  }, [title, canonical, url]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical || url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SHELeadsIndia" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@SHELeadsIndia" />
      <meta name="twitter:creator" content="@SHELeadsIndia" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SHELeadsIndia" />
      <meta name="language" content="English" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": canonical || url,
          "mainEntity": {
            "@type": "Organization",
            "name": "SHELeadsIndia",
            "url": "https://sheleadsindia.in",
            "logo": "https://sheleadsindia.in/she-leads-logo.png",
            "description": "Empowering women entrepreneurs with digital marketing, AI training, and business solutions"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 