
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Preview your markdown content before downloading or copying
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4 my-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {markdownContent}
          </pre>
        </ScrollArea>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </DialogContent>;
