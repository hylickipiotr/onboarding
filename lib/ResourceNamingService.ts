interface ResourceNamingServiceArgs {
  appName: string;
  serviceName?: string;
}

interface BuildNameArgs {
  appName: string;
  resourceName: string;
  serviceName?: string;
  separator?: string;
}

export class ResourceNamingService {
  private readonly appName: string;
  private readonly serviceName?: string;

  private static readonly SEPARATOR = '-';

  public constructor(args: ResourceNamingServiceArgs) {
    this.appName = args.appName;
    this.serviceName = args.serviceName;
  }

  public generate(resourceName: string) {
    return ResourceNamingService.buildName({
      appName: this.appName,
      serviceName: this.serviceName,
      resourceName,
    });
  }

  public static buildName({
    appName,
    resourceName,
    serviceName,
    separator = ResourceNamingService.SEPARATOR,
  }: BuildNameArgs) {
    return [appName, serviceName, resourceName].filter(Boolean).join(separator);
  }
}
