"use client"

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-lg">Configure your dashboard preferences</p>
      </div>

      <div className="max-w-2xl grid gap-6">
        {/* System Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">System Configuration</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>API Endpoints, database connections, and service configurations will be managed here.</p>
            <p className="text-xs">This page is a placeholder for future settings implementation.</p>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Manage log retention, export options, and data archival settings.</p>
            <p className="text-xs">This page is a placeholder for future settings implementation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
