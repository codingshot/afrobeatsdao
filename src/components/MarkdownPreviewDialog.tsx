
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarkdownPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdownContent: string;
  handleDownload: () => void;
  title: string;
}

const MarkdownPreviewDialog = ({
  open,
  onOpenChange,
  markdownContent,
  handleDownload,
  title
}: MarkdownPreviewDialogProps) => {
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard"
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard",
        variant: "destructive"
      });
    }
  };

  // Process the markdown to make links clickable in the preview
  const processMarkdown = (content: string) => {
    // Convert markdown links to HTML links for the preview
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const processedContent = content.replace(linkRegex, (match, text, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${text}</a>`;
    });
    
    // Convert markdown headers to styled text
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    return processedContent.replace(headerRegex, (match, hashes, text) => {
      const level = hashes.length;
      const fontSize = 6 - level + 1; // h1 is largest, h6 is smallest
      return `<div class="font-bold text-${fontSize}xl my-2">${text}</div>`;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Preview your markdown content before downloading or copying
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4 my-4 bg-white text-black">
          <div 
            className="whitespace-pre-wrap font-mono text-sm text-black"
            dangerouslySetInnerHTML={{ __html: processMarkdown(markdownContent) }}
          />
        </ScrollArea>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard} className="text-black border-black">
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button onClick={handleDownload} className="bg-black text-white">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkdownPreviewDialog;
