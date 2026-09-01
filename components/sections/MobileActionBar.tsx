import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/site";

/**
 * Phone-only bar pinned to the bottom of the screen, where the thumb already is.
 * Hidden from large screens, which keep the header buttons instead.
 */
export function MobileActionBar() {
  const whatsapp = whatsappHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-divider bg-page/95 px-4 pb-5 pt-3 backdrop-blur-lg lg:hidden">
      <div className="flex gap-3">
        <Button href="/contact" size="lg" className="flex-1">
          Get a free quote
        </Button>
        <Button
          href={whatsapp}
          variant="outline"
          size="lg"
          className="w-13 shrink-0 px-0"
          ariaLabel="WhatsApp us"
        >
          <WhatsAppIcon className="h-[22px] w-[22px]" />
        </Button>
      </div>
    </div>
  );
}
