
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Copy, Save, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TemplateVariable {
  key: string;
  label: string;
  value: string;
  placeholder: string;
}

interface TemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    title: string;
    content: string;
  } | null;
}

const commonVariables: TemplateVariable[] = [
  { key: 'CHAPTER_NAME', label: 'Chapter Name', value: '', placeholder: 'Afrobeats DAO [University Name] Chapter' },
  { key: 'UNIVERSITY_NAME', label: 'University Name', value: '', placeholder: 'University of Example' },
  { key: 'CHAPTER_ACRONYM', label: 'Chapter Acronym', value: '', placeholder: 'ABUE' },
  { key: 'PRESIDENT_NAME', label: 'President Name', value: '', placeholder: 'John Doe' },
  { key: 'PRESIDENT_EMAIL', label: 'President Email', value: '', placeholder: 'president@example.edu' },
  { key: 'ADVISOR_NAME', label: 'Faculty Advisor Name', value: '', placeholder: 'Dr. Jane Smith' },
  { key: 'ADVISOR_DEPARTMENT', label: 'Advisor Department', value: '', placeholder: 'Department of Music' },
  { key: 'CURRENT_DATE', label: 'Current Date', value: new Date().toLocaleDateString(), placeholder: 'MM/DD/YYYY' },
  { key: 'ACADEMIC_YEAR', label: 'Academic Year', value: '', placeholder: '2024-2025' },
  { key: 'MINIMUM_MEMBERS', label: 'Minimum Members', value: '5', placeholder: '5' },
];

export const TemplateEditor = ({ isOpen, onClose, template }: TemplateEditorProps) => {
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [processedContent, setProcessedContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved variables from localStorage
    const savedVariables = localStorage.getItem('afrobeats-template-variables');
    if (savedVariables) {
      const parsed = JSON.parse(savedVariables);
      setVariables(commonVariables.map(v => ({
        ...v,
        value: parsed[v.key] || v.value
      })));
    } else {
      setVariables([...commonVariables]);
    }
  }, []);

  useEffect(() => {
    if (template?.content) {
      let content = template.content;
      variables.forEach(variable => {
        const regex = new RegExp(`\\[${variable.key}\\]`, 'g');
        content = content.replace(regex, variable.value || variable.placeholder);
      });
      setProcessedContent(content);
    }
  }, [template, variables]);

  const handleVariableChange = (key: string, value: string) => {
    const updatedVariables = variables.map(v => 
      v.key === key ? { ...v, value } : v
    );
    setVariables(updatedVariables);
    
    // Save to localStorage
    const variableMap = updatedVariables.reduce((acc, v) => {
      acc[v.key] = v.value;
      return acc;
    }, {} as Record<string, string>);
    localStorage.setItem('afrobeats-template-variables', JSON.stringify(variableMap));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(processedContent);
      toast({
        title: "Copied to clipboard",
        description: "Template content has been copied to your clipboard"
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([processedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.title.replace(/\s+/g, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Markdown exported",
      description: "Template has been downloaded as a Markdown file"
    });
  };

  const handleExportDocx = () => {
    // Create a simple HTML structure that can be opened in Word
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${template?.title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 2cm; }
          h1, h2, h3 { color: #333; }
          p { margin-bottom: 1em; }
        </style>
      </head>
      <body>
        <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${processedContent}</pre>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.title.replace(/\s+/g, '_').toLowerCase()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Document exported",
      description: "Template has been downloaded as a Word document"
    });
  };

  const handleSaveTemplate = () => {
    // Save the current template with variables to localStorage
    if (template) {
      const savedTemplates = JSON.parse(localStorage.getItem('afrobeats-saved-templates') || '{}');
      savedTemplates[template.id] = {
        ...template,
        processedContent,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem('afrobeats-saved-templates', JSON.stringify(savedTemplates));
      
      toast({
        title: "Template saved",
        description: "Your template has been saved locally"
      });
    }
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Template: {template.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* Variables Panel */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Template Variables</h3>
            <div className="space-y-3 overflow-y-auto max-h-[60vh]">
              {variables.map((variable) => (
                <div key={variable.key} className="space-y-2">
                  <Label htmlFor={variable.key} className="text-sm font-medium">
                    {variable.label}
                  </Label>
                  <Input
                    id={variable.key}
                    value={variable.value}
                    onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                    placeholder={variable.placeholder}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Template Preview */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg">Template Preview</h3>
            <div className="border rounded-lg p-4 h-[50vh] overflow-y-auto bg-gray-50">
              <pre className="whitespace-pre-wrap text-sm font-mono text-black">
                {processedContent}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSaveTemplate} variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
              <Button onClick={handleCopyToClipboard} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy Text
              </Button>
              <Button onClick={handleExportMarkdown} variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export Markdown
              </Button>
              <Button onClick={handleExportDocx} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Export DOCX
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
