export const Card = ({ title, subtitle, children, footer, className = "" }) => {
  return (
    <div className={`bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md ${className}`}>
      
      {/* CARD HEADER */}
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-gray-50">
          {title && <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* CARD CONTENT */}
      <div className="p-6">
        {children}
      </div>

      {/* CARD FOOTER */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
};