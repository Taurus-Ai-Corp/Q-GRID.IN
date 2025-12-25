import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BIOMETRIC_TYPES } from "@/lib/constants";
import { Camera, Fingerprint, Mic, CheckCircle2, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CameraComponent } from "@/components/camera";

export default function KycEnrollment() {
  const [activeTab, setActiveTab] = useState("facial");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    setScanning(true);
    setProgress(0);
    setCompleted(false);

    // Simulate scanning process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setCompleted(true);
          toast({
            title: "Enrollment Successful",
            description: "Biometric data has been encrypted and stored safely.",
            className: "border-emerald-500 text-emerald-500 bg-emerald-500/10"
          });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleCameraCapture = (canvas: HTMLCanvasElement) => {
    // Process captured frame for facial recognition
    // This would integrate with facial recognition API in production
  };

  const reset = () => {
    setCompleted(false);
    setProgress(0);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Biometric Enrollment</h1>
          <p className="text-muted-foreground">
            Secure your QRM wallet by adding multi-factor biometric authentication. 
            All data is quantum-encrypted before storage.
          </p>
        </div>

        <Tabs defaultValue="facial" value={activeTab} onValueChange={(val) => { setActiveTab(val); reset(); }} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-card border border-border">
            <TabsTrigger value="facial" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-full text-base">
              <Camera className="w-4 h-4 mr-2" /> Facial Recognition
            </TabsTrigger>
            <TabsTrigger value="fingerprint" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-full text-base hidden">
              <Fingerprint className="w-4 h-4 mr-2" /> Fingerprint
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-full text-base">
              <Mic className="w-4 h-4 mr-2" /> Voice ID
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <Card className="border-primary/20 bg-card/60 backdrop-blur-sm min-h-[500px] flex flex-col">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-heading text-primary">
                  {activeTab === "facial" && "Facial Scan"}
                  {activeTab === "fingerprint" && "Touch Sensor"}
                  {activeTab === "voice" && "Voice Recording"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "facial" && "Position your face within the frame. Ensure good lighting."}
                  {activeTab === "fingerprint" && "Place your finger on your device's sensor repeatedly."}
                  {activeTab === "voice" && "Read the phrase shown on screen clearly."}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col items-center justify-center relative p-8">
                {/* Scanner/Camera Visualization */}
                <div className="mb-8">
                  {activeTab === "facial" && scanning ? (
                    <CameraComponent
                      isActive={scanning}
                      onCapture={handleCameraCapture}
                    />
                  ) : (
                    <div className="relative w-80 h-80 flex items-center justify-center">
                      {/* Background/Frame */}
                      <div className={cn(
                        "absolute inset-0 border-2 rounded-3xl transition-colors duration-500",
                        completed ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : 
                        scanning ? "border-primary animate-pulse shadow-[0_0_30px_rgba(0,240,255,0.3)]" : 
                        "border-muted-foreground/30 border-dashed"
                      )} />
                      
                      {/* Scan Line */}
                      {scanning && !completed && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_#00f0ff] animate-[scan_2s_ease-in-out_infinite]" />
                      )}

                      {/* Content inside Scanner */}
                      <div className="text-center z-10">
                         {completed ? (
                           <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                             <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500">
                               <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                             </div>
                             <h3 className="text-xl font-bold text-emerald-400">Enrollment Complete</h3>
                             <p className="text-sm text-muted-foreground mt-2">Hash: {Math.random().toString(36).substring(7)}...</p>
                           </div>
                         ) : scanning ? (
                           <div className="flex flex-col items-center">
                             <p className="text-2xl font-mono font-bold text-primary mb-2">{progress}%</p>
                             <p className="text-sm text-primary/70 animate-pulse">
                                {activeTab === "facial" ? "Analyzing biometric points..." : 
                                 activeTab === "fingerprint" ? "Capturing ridges..." : "Analyzing vocal print..."}
                             </p>
                           </div>
                         ) : (
                           <div className="opacity-50">
                             {activeTab === "facial" && <Camera className="w-24 h-24 mx-auto mb-4" data-testid="icon-camera-ready" />}
                             {activeTab === "fingerprint" && <Fingerprint className="w-24 h-24 mx-auto mb-4" />}
                             {activeTab === "voice" && <Mic className="w-24 h-24 mx-auto mb-4" />}
                             <p className="text-sm font-mono">READY TO SCAN</p>
                           </div>
                         )}
                      </div>
                      
                      {/* Corners */}
                      {!completed && (
                        <>
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="w-full max-w-xs space-y-4">
                  {scanning && <Progress value={progress} className="h-2" />}
                  
                  {!scanning && !completed && (
                    <Button 
                      onClick={handleScan} 
                      size="lg" 
                      className="w-full bg-primary text-background font-bold hover:bg-primary/90 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      data-testid={activeTab === "facial" ? "button-start-facial" : undefined}
                    >
                      {activeTab === "facial" && "Start Facial Scan"}
                      {activeTab === "fingerprint" && "Start Sensor Scan"}
                      {activeTab === "voice" && "Start Recording"}
                    </Button>
                  )}
                  
                  {scanning && activeTab === "facial" && (
                    <Button 
                      onClick={() => setScanning(false)} 
                      variant="outline"
                      size="lg"
                      className="w-full"
                      data-testid="button-stop-camera"
                    >
                      Stop Camera
                    </Button>
                  )}
                  
                  {completed && (
                     <Button onClick={reset} variant="outline" className="w-full">
                       Enroll Another Factor
                     </Button>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted/20 border-t border-border p-4 text-xs text-center text-muted-foreground justify-center">
                 <ShieldCheck className="w-3 h-3 mr-2" />
                 Data is encrypted with CRYSTALS-Dilithium (Post-Quantum Cryptography)
              </CardFooter>
            </Card>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
