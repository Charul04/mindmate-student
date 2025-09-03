import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TermsPrivacyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "terms" | "privacy";
}

export default function TermsPrivacyDialog({ 
  isOpen, 
  onClose, 
  defaultTab = "terms" 
}: TermsPrivacyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            MindMate – Terms & Conditions and Privacy Policy
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="flex-1">
          <TabsList className="mx-6 mt-4 grid w-[calc(100%-48px)] grid-cols-2">
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-0">
            <ScrollArea className="h-[50vh] px-6 py-4">
              <div className="space-y-4 text-sm">
                <h3 className="font-semibold text-base">Terms & Conditions</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">1. Acceptance of Terms</h4>
                    <p className="text-muted-foreground">
                      By creating an account or using MindMate, you agree to these Terms & Conditions. If you don't agree, please do not use the app.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">2. Purpose of the App</h4>
                    <p className="text-muted-foreground">
                      MindMate supports student well-being and academic productivity. It provides tools like planners, focus timers, habit trackers, mood check-ins, and reports. MindMate is not a medical or therapeutic service.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">3. Eligibility</h4>
                    <p className="text-muted-foreground">
                      You must be 13+ to use this app. If you are under 18, please ensure your parent/guardian is aware you're using MindMate.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">4. User Responsibilities</h4>
                    <p className="text-muted-foreground">
                      Use MindMate for personal purposes only. You are responsible for information you enter and for keeping your login secure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">5. Accounts & Security</h4>
                    <p className="text-muted-foreground">
                      You are responsible for your account. MindMate is not liable for losses from unauthorized use.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">6. Subscriptions & Payments</h4>
                    <p className="text-muted-foreground">
                      Some features may require payment through Gumroad. Payments are handled by Gumroad and follow their policies.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">7. Privacy & Data</h4>
                    <p className="text-muted-foreground">
                      We only collect necessary data (like email and password for login).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">8. Disclaimer of Liability</h4>
                    <p className="text-muted-foreground">
                      MindMate is not a replacement for therapy or medical advice. If you face serious issues, please consult a professional.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">9. Modifications</h4>
                    <p className="text-muted-foreground">
                      We may update the app or Terms at any time.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">10. Termination</h4>
                    <p className="text-muted-foreground">
                      We may suspend accounts that misuse the app.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">11. Governing Law</h4>
                    <p className="text-muted-foreground">
                      These Terms are governed by the laws of your country.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <ScrollArea className="h-[50vh] px-6 py-4">
              <div className="space-y-4 text-sm">
                <h3 className="font-semibold text-base">Privacy Policy</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">1. Information We Collect</h4>
                    <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                      <li>Email and password (for sign-up and login).</li>
                      <li>Basic device data (for security).</li>
                      <li>Payments (handled securely by Gumroad, not stored by us).</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">2. How We Use Your Information</h4>
                    <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                      <li>To provide account access and secure login.</li>
                      <li>To improve app performance.</li>
                      <li>To communicate updates and support.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">3. How We Do NOT Use Your Information</h4>
                    <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                      <li>We do not sell or rent your data.</li>
                      <li>We do not use your information for targeted ads.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">4. Data Security</h4>
                    <p className="text-muted-foreground">
                      Your data is stored securely using modern encryption practices.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">5. Data Retention</h4>
                    <p className="text-muted-foreground">
                      We keep your data as long as your account is active. You may request deletion anytime.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">6. Children's Privacy</h4>
                    <p className="text-muted-foreground">
                      MindMate is for ages 13+. If you are under 18, let your parent/guardian know you are using MindMate.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">7. Your Rights</h4>
                    <p className="text-muted-foreground">
                      You may request access, correction, or deletion of your data. Contact us at: c8556403@gmail.com
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">8. Changes</h4>
                    <p className="text-muted-foreground">
                      We may update this policy occasionally. Updates will be posted in the app.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">9. Contact</h4>
                    <p className="text-muted-foreground">
                      For questions, contact us at: c8556403@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="px-6 py-4 border-t">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}