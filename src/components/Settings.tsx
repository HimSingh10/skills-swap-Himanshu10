
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Trash2, Download } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    profile: {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      timezone: 'America/New_York',
      language: 'en',
      bio: 'Full-stack developer passionate about sharing knowledge'
    },
    notifications: {
      swapRequests: true,
      messages: true,
      reminders: true,
      newsletter: false,
      emailDigest: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLocation: true,
      allowMessages: true,
      dataSharing: false
    },
    preferences: {
      theme: 'system',
      autoAcceptSwaps: false,
      maxActiveSwaps: 5,
      defaultSessionDuration: 60
    }
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings...`);
    // TODO: Implement save logic
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    // TODO: Implement data export
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested...');
    // TODO: Implement account deletion
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Settings
        </h1>
        <SettingsIcon className="h-8 w-8 text-muted-foreground" />
      </div>

      <Tabs defaultValue="profile" className="animate-scale-in">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={settings.profile.displayName}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, displayName: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.profile.timezone}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, timezone: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.profile.language}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, language: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={settings.profile.bio}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, bio: e.target.value }
                  })}
                  rows={3}
                />
              </div>

              <Button onClick={() => handleSave('profile')}>
                Save Profile Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Swap Requests</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone wants to swap skills with you
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.swapRequests}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, swapRequests: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive new messages
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.messages}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, messages: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Session Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about upcoming skill swap sessions
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.reminders}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, reminders: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Newsletter</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive our weekly newsletter with tips and updates
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.newsletter}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, newsletter: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Digest</h4>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of your activity and opportunities
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.emailDigest}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailDigest: checked }
                  })}
                />
              </div>

              <Button onClick={() => handleSave('notifications')}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your information and contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, profileVisibility: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see</SelectItem>
                    <SelectItem value="registered">Registered Users Only</SelectItem>
                    <SelectItem value="private">Private - Invitation Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Email Address</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your email address
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, showEmail: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Location</h4>
                  <p className="text-sm text-muted-foreground">
                    Display your location on your profile
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showLocation}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, showLocation: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Allow Direct Messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Let others send you direct messages
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowMessages}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, allowMessages: checked }
                  })}
                />
              </div>

              <Button onClick={() => handleSave('privacy')}>
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>
                Customize your experience on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, theme: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-accept Compatible Swaps</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically accept swap requests that match your criteria
                  </p>
                </div>
                <Switch
                  checked={settings.preferences.autoAcceptSwaps}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, autoAcceptSwaps: checked }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="maxSwaps">Maximum Active Swaps</Label>
                <Select
                  value={settings.preferences.maxActiveSwaps.toString()}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, maxActiveSwaps: parseInt(value) }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 swaps</SelectItem>
                    <SelectItem value="5">5 swaps</SelectItem>
                    <SelectItem value="10">10 swaps</SelectItem>
                    <SelectItem value="999">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sessionDuration">Default Session Duration (minutes)</Label>
                <Select
                  value={settings.preferences.defaultSessionDuration.toString()}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, defaultSessionDuration: parseInt(value) }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('preferences')}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Management */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Export your data or delete your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Export Your Data
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Download all your data including profiles, swaps, and messages.
                </p>
                <Button onClick={handleExportData} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>

              <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  Delete Account
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button onClick={handleDeleteAccount} variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
