/**
 * Global Google Maps Script Loader
 * Prevents duplicate loading of Google Maps JavaScript API
 */

interface GoogleMapsLoader {
  isLoaded: boolean;
  isLoading: boolean;
  loadPromise: Promise<void> | null;
}

class GoogleMapsScriptLoader {
  private static instance: GoogleMapsScriptLoader;
  private state: GoogleMapsLoader = {
    isLoaded: false,
    isLoading: false,
    loadPromise: null,
  };

  private constructor() { }

  public static getInstance(): GoogleMapsScriptLoader {
    if (!GoogleMapsScriptLoader.instance) {
      GoogleMapsScriptLoader.instance = new GoogleMapsScriptLoader();
    }
    return GoogleMapsScriptLoader.instance;
  }

  public async loadGoogleMaps(): Promise<void> {
    // If already loaded, return immediately
    if (this.state.isLoaded || (window.google && window.google.maps)) {
      this.state.isLoaded = true;
      return Promise.resolve();
    }

    // If currently loading, return the existing promise
    if (this.state.isLoading && this.state.loadPromise) {
      return this.state.loadPromise;
    }

    // Start loading
    this.state.isLoading = true;
    this.state.loadPromise = this.loadScript();

    try {
      await this.state.loadPromise;
      this.state.isLoaded = true;
    } catch (error) {
      this.state.isLoading = false;
      this.state.loadPromise = null;
      throw error;
    } finally {
      this.state.isLoading = false;
    }
  }

  private async loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Check if script is already in DOM
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          // Script exists, wait for it to load
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('Failed to load existing Google Maps script')));
          return;
        }

        // Get the script URL from our API
        fetch('/api/maps/script')
          .then(response => response.json())
          .then(data => {
            if (!data.scriptUrl) {
              throw new Error('Failed to get Google Maps script URL');
            }

            // Create callback function
            window.initMap = () => {
              resolve();
            };

            // Load the Google Maps script
            const script = document.createElement('script');
            script.src = data.scriptUrl;
            script.async = true;
            script.defer = true;
            script.onload = () => {
              // Script loaded successfully
            };
            script.onerror = () => {
              reject(new Error('Failed to load Google Maps script'));
            };

            document.head.appendChild(script);
          })
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  public isGoogleMapsLoaded(): boolean {
    return this.state.isLoaded || !!(window.google && window.google.maps);
  }

  public reset(): void {
    this.state = {
      isLoaded: false,
      isLoading: false,
      loadPromise: null,
    };
  }
}

// Export singleton instance
export const googleMapsLoader = GoogleMapsScriptLoader.getInstance();

// Declare global window interface
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}
